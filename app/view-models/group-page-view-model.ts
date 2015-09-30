import examplesVM = require("./examples-model");
import observable = require("data/observable");
import paltfrom = require("platform");

export class GroupPageViewModel extends observable.Observable {
    public group: examplesVM.ExampleGroup;
    public examples: Array<examplesVM.Example>;
    public isSingleControl: boolean;

    constructor(group: examplesVM.ExampleGroup, isSingleControl: boolean) {
        super();

        this.set("examples", examplesVM.filterExamples(group.controls));
        this.set("group", group);
        this.set("isSingleControl", isSingleControl);
        this.set("useWrapLayout", false);
    }

    public toggleShowNew() {
        this.set("showOnlyNew", !this.get("showOnlyNew"));
    }

    public toggleWrapLayout() {
        this.set("useWrapLayout", !this.get("useWrapLayout"));
    }

    get screenWidth(): number {
        return paltfrom.screen.mainScreen.widthDIPs;
    }
}

export function getGroupForControl(control: string): GroupPageViewModel {
    // TODO: tint: this.group.tint ...
    var group = examplesVM.controlInfos.get(control).group;
    var exampleGroup = <examplesVM.ExampleGroup>{ title: capitalize(control), isNew: false, controls: [control], tint: group.tint };
    return new GroupPageViewModel(exampleGroup, true);
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
