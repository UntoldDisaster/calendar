import {App, PluginSettingTab, Setting} from "obsidian";
import DisastersCalendar from "../main";

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
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
