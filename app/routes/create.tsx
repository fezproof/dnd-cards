import { FormProvider, getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  ClientActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "@remix-run/react";
import CardFormFields from "~/components/CardForm";
import { createCard, itemSchema } from "~/data/card";

export const clientLoader = async () => {
  return {};
};
export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();

  const result = parseWithZod(formData, { schema: itemSchema });
  if (result.status !== "success") {
    return result.reply();
  }

  const createResult = await createCard(result.value);

  if (!createResult) {
    return result.reply({ formErrors: ["Failed to create item"] });
  }
  return redirect("/");
};

export default function CreateCard() {
  const lastResult = useActionData<typeof clientAction>();
  const [form] = useForm({
    defaultValue: {
      rarity: "common",
      type: "weapon",
      effects: [],
      stats: [],
      damage: [],
    },
    lastResult,
    constraint: getZodConstraint(itemSchema),
    onValidate(context) {
      return parseWithZod(context.formData, { schema: itemSchema });
    },
  });

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <FormProvider context={form.context}>
        <Form method="post" {...getFormProps(form)}>
          <h1>Create Card</h1>
          <CardFormFields formId={form.id} />
          <div className="flex flex-row justify-between">
            <Link to="/">Cancel</Link>
            <button type="submit">Create</button>
          </div>
        </Form>
      </FormProvider>
    </main>
  );
}
