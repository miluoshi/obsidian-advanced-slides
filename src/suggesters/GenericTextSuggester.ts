import type {App} from "obsidian";
import { TextInputSuggest } from "./Suggest";

export class GenericTextSuggester extends TextInputSuggest<string> {
    constructor(public app: App, public inputEl: HTMLInputElement, private items: string[]) {
        super(app, inputEl);
    }

    getSuggestions(inputStr: string): string[] {
        const inputLowerCase: string = inputStr.toLowerCase();

        const filtered = this.items.filter(item => {
            if (item.toLowerCase().contains(inputLowerCase))
                return item;
        });

        if (!filtered) this.close();
        if (filtered?.length > 0) return filtered;
    }

    selectSuggestion(item: string): void {
        this.inputEl.value = item;
        this.inputEl.trigger("input");
        this.close();
    }

    renderSuggestion(value: string, el: HTMLElement): void {
        if (value) el.setText(value);
    }
}
