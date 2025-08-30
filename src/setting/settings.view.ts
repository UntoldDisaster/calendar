import {App, PluginSettingTab, Setting} from "obsidian";
import DisastersCalendar from "../main";

export interface DisastersCalendarSettings {
	showCalendarRibbon: boolean;
}

export const DEFAULT_SETTINGS: DisastersCalendarSettings = {
	showCalendarRibbon: true
}

export class DisastersCalendarSettingTab extends PluginSettingTab {
	plugin: DisastersCalendar;

	constructor(app: App, plugin: DisastersCalendar) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		//TODO update from sample, allowing actual customization.
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Show Calendar Ribbon')
			.setDesc('Toggle whether the calendar Icon should be displayed in the Ribbon.')
			.addToggle(
				t => t.setValue(this.plugin.settings.showCalendarRibbon)
					.onChange(async (value) => {
						this.plugin.settings.showCalendarRibbon = value;
						await this.plugin.saveSettings();
						if(value) {

						}
					}));
	}
}
