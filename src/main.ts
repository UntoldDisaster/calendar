import {App, Platform, Editor, MarkdownView, Modal, Plugin, WorkspaceLeaf} from 'obsidian';
import {DEFAULT_SETTINGS, DisastersCalendarSettings, DisastersCalendarSettingTab} from "./setting/settings.view";
import {CalendarView, View} from "./view/view";

export default class DisastersCalendar extends Plugin {
	settings: DisastersCalendarSettings;

	async onload() {
		console.log("Load Disasters Calendar");
		await this.loadSettings();

		this.registerViews();

		// This creates an icon in the left ribbon.
		if(this.settings.showCalendarRibbon) {
			this.addRibbonIcon(View.Calendar.icon,
				'Open Calendar',
				(evt: MouseEvent) => {
					this.addCalendarView({
						full: evt.getModifierState(
							Platform.isMacOS ? "Meta" : "Control"
						),
					});
			});
		}
		// Perform additional things with the ribbon

		//this.addStatusItems();

		//this.addCommands();

		// This adds a setting tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DisastersCalendarSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		console.log("Unload Disasters Calendar");
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async registerViews() {
		this.registerView(View.Calendar.key, (leaf: WorkspaceLeaf) => new CalendarView(leaf));
	}

	addCalendarView(params: { full?: boolean; startup?: boolean } = {}) {
		if (params?.startup && this.app.workspace.getLeavesOfType(View.Calendar.key)?.length) {
			return;
		}
		this.getLeaf(params?.full ?? false);
	}

	getLeaf(full: boolean) {
		let leaf: WorkspaceLeaf | null = full
			? this.app.workspace.getLeaf(true)
			: this.app.workspace.getRightLeaf(false);

		leaf?.setViewState({
			type: View.Calendar.key,
		});

		if (leaf) this.app.workspace.revealLeaf(leaf);

		return leaf;
	}

	addStatusItems() {
		// TODO keeping sample status for now, remove with first status implementation
		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');
	}

	addCommands() {
		// TODO keeping sample commands for now, remove with first command implementation
		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});

		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
