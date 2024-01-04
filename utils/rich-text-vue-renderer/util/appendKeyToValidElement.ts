// import { cloneElement, isValidElement, ReactNode } from 'react';
import { cloneVNode } from "vue";
import type { VNode } from "vue";

export function appendKeyToValidElement(element: VNode, key: number): VNode {
  // if (element.key === null) {
  if (element.hasOwnProperty("key")) {
    return cloneVNode(element, { key });
  }
  return element;
}
