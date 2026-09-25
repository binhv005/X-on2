"use client";

import { useEffect } from "react";

/**
 * Global component that intercepts HTML5 form validation 'invalid' events
 * and ensures validation messages (e.g. required field, invalid email)
 * are always presented in English regardless of the user's OS/browser locale.
 */
export function FormValidationEnforcer() {
  useEffect(() => {
    function handleInvalid(e: Event) {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!target || !target.validity) return;

      if (target.validity.valueMissing) {
        if (target.type === "checkbox") {
          target.setCustomValidity("Please check this box if you want to proceed.");
        } else if (target.type === "radio") {
          target.setCustomValidity("Please select one of these options.");
        } else if (target.tagName === "SELECT") {
          target.setCustomValidity("Please select an item in the list.");
        } else {
          target.setCustomValidity("Please fill out this field.");
        }
      } else if (target.validity.typeMismatch) {
        if (target.type === "email") {
          target.setCustomValidity("Please enter a valid email address.");
        } else if (target.type === "url") {
          target.setCustomValidity("Please enter a valid web URL.");
        } else {
          target.setCustomValidity("Please match the requested format.");
        }
      } else if (target.validity.patternMismatch) {
        target.setCustomValidity("Please match the requested format.");
      } else if (target.validity.tooShort) {
        const min = (target as HTMLInputElement).minLength;
        target.setCustomValidity(`Please lengthen this text to ${min} characters or more.`);
      } else if (target.validity.tooLong) {
        const max = (target as HTMLInputElement).maxLength;
        target.setCustomValidity(`Please shorten this text to ${max} characters or less.`);
      } else if (target.validity.rangeUnderflow) {
        const minVal = (target as HTMLInputElement).min;
        target.setCustomValidity(`Value must be greater than or equal to ${minVal}.`);
      } else if (target.validity.rangeOverflow) {
        const maxVal = (target as HTMLInputElement).max;
        target.setCustomValidity(`Value must be less than or equal to ${maxVal}.`);
      } else if (target.validity.stepMismatch) {
        target.setCustomValidity("Please enter a valid value.");
      } else if (target.validity.badInput) {
        target.setCustomValidity("Please enter a valid input.");
      }
    }

    function handleInput(e: Event) {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (target && typeof target.setCustomValidity === "function") {
        target.setCustomValidity("");
      }
    }

    // Capture invalid events at document root
    document.addEventListener("invalid", handleInvalid, true);
    document.addEventListener("input", handleInput, true);
    document.addEventListener("change", handleInput, true);

    return () => {
      document.removeEventListener("invalid", handleInvalid, true);
      document.removeEventListener("input", handleInput, true);
      document.removeEventListener("change", handleInput, true);
    };
  }, []);

  return null;
}
