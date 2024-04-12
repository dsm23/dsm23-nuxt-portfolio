<script setup lang="ts">
  import { Form, Field as FormField } from "vee-validate";
  import type { SubmissionHandler, GenericObject } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import { toast } from "vue-sonner";
  import { z } from "zod";
  import sleep from "~/utils/sleep";
  // import { maxLength, minLength, string } from "valibot";
  // import type { Output } from "valibot";

  // const schema = object({
  //   firstName: string([minLength(2), maxLength(50)]),
  //   lastName: string([minLength(2), maxLength(50)]),
  // });

  const schema = z.object({
    firstName: z.string().min(1, {
      message: "First Name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last Name is required",
    }),
    // employed: z.boolean(),
    // favoriteColour: z
    //   .literal("#ff0000")
    //   .or(z.literal("#00ff00"))
    //   .or(z.literal("#0000ff")),
    // toppings: z
    //   .array(
    //     z
    //       .literal("chicken")
    //       .or(z.literal("ham"))
    //       .or(z.literal("mushrooms"))
    //       .or(z.literal("cheese"))
    //       .or(z.literal("tuna"))
    //       .or(z.literal("pineapple")),
    //   )
    //   .min(1),
    // sauces: z
    //   .array(
    //     z
    //       .literal("ketchup")
    //       .or(z.literal("mustard"))
    //       .or(z.literal("mayonnaise"))
    //       .or(z.literal("guacamole")),
    //   )
    //   .min(1),
    stooge: z.literal("larry").or(z.literal("moe")).or(z.literal("curly")),
    // notes: z.string(),
  });

  // const schema = Yup.object().shape({
  //   firstName: Yup.string()
  //     .min(2, "Too Short!")
  //     .max(50, "Too Long!")
  //     .required("Required"),
  //   lastName: Yup.string()
  //     .min(2, "Too Short!")
  //     .max(50, "Too Long!")
  //     .required("Required"),
  //   email: Yup.string().email("Invalid email").required("Required"),
  //   checkboxes: Yup.array().min(2, "Too Few!").max(2, "Too Many!"),
  //   stooge: Yup.string().required("Required"),
  //   toppings: Yup.array().required("Required"),
  //   test: Yup.string().required("Required"),
  // });

  type Values = z.infer<typeof schema>;

  const onSubmit: SubmissionHandler<Values, GenericObject, unknown> = async (
    values,
  ) => {
    toast.promise(sleep(3000), {
      loading: "Loading..., (not actually doing anything)",
      success: () => JSON.stringify(values, null, 2),
      error: () => "Error",
    });

    await sleep(9000);
  };
</script>

<template>
  <Main class="w-full px-6 py-8">
    <GoBack class="mb-4" href="/#projects" />

    <h1 class="text-4xl uppercase tracking-widest text-sky-600">Simple form</h1>

    <p>
      An example of a simple form using
      <Anchor
        href="https://vee-validate.logaretm.com/v4/"
        target="_blank"
        rel="noopener noreferrer"
        >VeeValidate</Anchor
      >
      and
      <Anchor
        href="https://www.shadcn-vue.com/docs/components/form.html"
        target="_blank"
        rel="noopener noreferrer"
        >shadcn-vue</Anchor
      >
    </p>

    <div className="container mx-auto">
      <Form
        :validation-schema="toTypedSchema(schema)"
        @submit="onSubmit"
        v-slot="{ errors, handleReset, isSubmitting, values }"
      >
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" type="radio" name="stooge">
          <FormItem class="space-y-3">
            <FormLabel>Best Stooge</FormLabel>

            <FormControl>
              <RadioGroup
                class="flex flex-col space-y-1"
                v-bind="componentField"
              >
                <FormItem class="flex items-center gap-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="larry" />
                  </FormControl>
                  <FormLabel class="font-normal"> Larry </FormLabel>
                </FormItem>
                <FormItem class="flex items-center gap-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="moe" />
                  </FormControl>
                  <FormLabel class="font-normal"> Moe </FormLabel>
                </FormItem>
                <FormItem class="flex items-center gap-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="curly" />
                  </FormControl>
                  <FormLabel class="font-normal"> Curly </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <pre>{{ JSON.stringify(values, null, 2) }}</pre>

        <pre>{{ JSON.stringify(errors, null, 2) }}</pre>

        <div className="mb-8 flex space-x-4">
          <button type="button" variant="outline" @click="() => handleReset()">
            Reset
          </button>
          <button type="submit" :disabled="isSubmitting">Submit</button>
        </div>
      </Form>
    </div>
    <Toaster rich-colors />
  </Main>
</template>
