import { Page } from "@playwright/test";
import path from "path";

export function getRandomText({ length = 7, prefix = "" }) {
  let randomText = "";
  const charOpts =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charOptsLength = charOpts.length;
  for (let i = 0; i < length; i++) {
    randomText += charOpts.charAt(Math.floor(Math.random() * charOptsLength));
  }
  if (prefix) {
    randomText = `${prefix}_${randomText}`;
  }
  return randomText;
}

/**
 * Method to get text in form of array from all the matching selectors
 * This returns the text array conatining all the text fetched from matching selector
 */
export const getTextArray = async (
  selector: string,
  page: Page,
) => {
  const textArray = await page.$$eval(selector, (el) =>
    el.map((li) => li.textContent)
  );
  return textArray;
};