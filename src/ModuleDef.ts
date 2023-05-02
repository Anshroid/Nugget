import {ModuleInfo} from "@/pages/module";

export interface ModuleMetadata extends ModuleInfo {
    description: string;
    triggers: ModuleTrigger[];
}

interface ModuleTrigger {
    type: "time" | "intent" | "constant";
    params?: any[];
}

interface ModuleTimeTrigger extends ModuleTrigger {
    type: "time";
    args: {
        timestamp: number;
        repeat: number;
    }
}

interface ModuleIntentTrigger extends ModuleTrigger {
    type: "intent";
    args: {
        intent: string;
        triggerPhrases: string[];
    }
}

interface ModuleConstantTrigger extends ModuleTrigger {
    type: "constant";
}