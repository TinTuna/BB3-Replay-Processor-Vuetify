import { StepType } from "../IdTypes/StepType"
import { StepResult } from "./StepResult"

export type TurnActionEvent = {
    eventName: 'Step' | 'PlayerStep' | 'DamageStep'
    eventType: StepType
    eventResults: StepResult[]
}