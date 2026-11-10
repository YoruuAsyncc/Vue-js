import type { InjectionKey, Ref } from "vue";

export const userNameKey: InjectionKey<Ref<string>> = Symbol("userName");
