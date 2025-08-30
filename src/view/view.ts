import {
	ItemView, WorkspaceLeaf
} from "obsidian";
import {Icon} from "../util/icon"

export const View = {
	Calendar: {
		key: "disasters-calendar-view",
		name: "Disaster's Calendar",
		icon: Icon.Calendar,
	},
	Timeline: {
		key: "disasters-timeline-view",
		name: "Disaster's Timeline",
		icon: Icon.Timeline,
	},
} as const;

export type View = (typeof View)[keyof typeof View];

export class DefaultItemView extends ItemView {

	constructor(leaf: WorkspaceLeaf, private view: View) {
		super(leaf);
	}

	getViewType(): string {
		return this.view.key;
	}

	getDisplayText(): string {
		return this.view.name;
	}
}

export class CalendarView extends DefaultItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf, View.Calendar);
	}
}

export class TimelineView extends DefaultItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf, View.Timeline);
	}
}
