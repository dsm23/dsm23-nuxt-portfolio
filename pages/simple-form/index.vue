<script setup lang="ts">
  import { Form, Field as FormField } from "vee-validate";
  import type { SubmissionHandler, GenericObject } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import { toast } from "vue-sonner";
  import { z } from "zod";
  import sleep from "~/utils/sleep";

  const schema = z.object({
    firstName: z.string().min(1, {
      message: "First Name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last Name is required",
    }),
    employed: z.boolean(),
    favoriteColour: z
      .literal("#ff0000")
      .or(z.literal("#00ff00"))
      .or(z.literal("#0000ff")),
    toppings: z
      .array(
        z
          .literal("chicken")
          .or(z.literal("ham"))
          .or(z.literal("mushrooms"))
          .or(z.literal("cheese"))
          .or(z.literal("tuna"))
          .or(z.literal("pineapple")),
      )
      .min(1),
    sauces: z
      .array(
        z
          .literal("ketchup")
          .or(z.literal("mustard"))
          .or(z.literal("mayonnaise"))
          .or(z.literal("guacamole")),
      )
      .min(1),
    stooge: z.literal("larry").or(z.literal("moe")).or(z.literal("curly")),
    notes: z.string(),
  });

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

  const items = [
    {
      id: "ketchup",
      label: "Ketchup",
    },
    {
      id: "mustard",
      label: "Mustard",
    },
    {
      id: "mayonnaise",
      label: "Mayonnaise",
    },
    {
      id: "guacamole",
      label: "Guacamole",
    },
  ] as const;
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

        <FormField
          v-slot="{ value, handleChange }"
          type="checkbox"
          name="employed"
        >
          <FormItem
            class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4"
          >
            <FormControl>
              <Checkbox :checked="value" @update:checked="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Employed</FormLabel>
              <FormDescription>
                This is just a description for test purposes.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="favoriteColour">
          <FormItem>
            <FormLabel>Favourite Colour</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a colour" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="#ff0000">❤️ Red</SelectItem>
                  <SelectItem value="#00ff00">💚 Green</SelectItem>
                  <SelectItem value="#0000ff">💙 Blue</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription>
              This is just a description for test purposes.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="toppings">
          <FormItem>
            <FormLabel>Toppings</FormLabel>
            <FormControl>
              <select
                v-bind="componentField"
                multiple
                @change="
                  (event) =>
                    (event.target as HTMLSelectElement).selectedOptions != null
                      ? componentField.onChange(
                          [
                            ...(event.target as HTMLSelectElement)
                              .selectedOptions,
                          ].map((opt) => opt.value),
                        )
                      : componentField.onChange([])
                "
              >
                <option value="chicken">🐓 Chicken</option>
                <option value="ham">🐷 Ham</option>
                <option value="mushrooms">🍄 Mushrooms</option>
                <option value="cheese">🧀 Cheese</option>
                <option value="tuna">🐟 Tuna</option>
                <option value="pineapple">🍍 Pineapple</option>
              </select>
            </FormControl>
            <FormDescription>
              This is just a description for test purposes.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="sauces">
          <FormItem>
            <div class="mb-4">
              <FormLabel class="text-base"> Sauces </FormLabel>
              <FormDescription> Select any sauces </FormDescription>
            </div>

            <FormField
              v-for="item in items"
              v-slot="{ value, handleChange }"
              :key="item.id"
              type="checkbox"
              :value="item.id"
              :unchecked-value="false"
              name="items"
            >
              <FormItem class="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    :checked="value?.includes(item.id)"
                    @update:checked="handleChange"
                  />
                </FormControl>
                <FormLabel class="font-normal">
                  {{ item.label }}
                </FormLabel>
              </FormItem>
            </FormField>
            <FormDescription>
              This is just a description for test purposes.
            </FormDescription>
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

        <FormField v-slot="{ componentField }" name="notes">
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea v-bind="componentField" />
            </FormControl>
            <FormDescription>
              This is just a description for test purposes.
            </FormDescription>
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
