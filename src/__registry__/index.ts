import { formikComponentRegistry } from "./formik";
import { reactHookFormComponentRegistry } from "./react-hook-form";
import { tanstackFormComponentRegistry } from "./tanstack-form";

const componentRegistry = {
  formik: formikComponentRegistry,
  "react-hook-form": reactHookFormComponentRegistry,
  "tanstack-form": tanstackFormComponentRegistry,
};

type ComponentRegistryType = keyof typeof componentRegistry;

export { componentRegistry, type ComponentRegistryType };
