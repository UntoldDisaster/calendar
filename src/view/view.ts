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

export class CalendarView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return View.Calendar.key;
	}

	getDisplayText(): string {
		return View.Calendar.name;
	}
}

export class TimelineView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return View.Timeline.key;
	}

	getDisplayText(): string {
		return View.Timeline.name;
	}
}
