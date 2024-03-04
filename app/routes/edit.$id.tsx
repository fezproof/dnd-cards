import { FormProvider, getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  ClientActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import CardFormFields from "~/components/CardForm";
import { getCard, itemSchema, updateCard } from "~/data/card";

const getItem = async (id: string | undefined) => {
  if (!id) {
    throw redirect("/");
  }
  const existing = await getCard(id);
  if (!existing) {
    throw redirect("/");
  }
  return existing;
};

export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
  const [id, existingItem] = await getItem(params.id);

  return { id, existingItem };
};

export const clientAction = async ({
  request,
  params,
}: ClientActionFunctionArgs) => {
  const [existingId] = await getItem(params.id);

  const formData = await request.formData();

  const result = parseWithZod(formData, { schema: itemSchema });
  if (result.status !== "success") {
    return result.reply();
  }

  const updateResult = await updateCard(existingId, result.value);

  if (!updateResult) {
    return result.reply({ formErrors: ["Failed to update item"] });
  }

  return redirect("/");
};

export default function CreateCard() {
  const { existingItem } = useLoaderData<typeof clientLoader>();
  const lastResult = useActionData<typeof clientAction>();
  const [form] = useForm({
    defaultValue: existingItem,
    lastResult,
    constraint: getZodConstraint(itemSchema),
    onValidate(context) {
      return parseWithZod(context.formData, { schema: itemSchema });
    },
  });

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <FormProvider context={form.context}>
        <Form method="post" {...getFormProps(form)}>
          <h1 className="mb-4 text-lg">Edit Card</h1>

          <CardFormFields formId={form.id} />

          <div className="flex flex-row justify-between">
            <Link to="/">Cancel</Link>
            <button type="submit">Save</button>
          </div>
        </Form>
      </FormProvider>
    </main>
  );
}
