import { StepResult } from "./StepResult"

export type TurnActionEvent = {
    eventType: 'Step' | 'PlayerStep' | 'DamageStep'
    eventResults: StepResult[]
}