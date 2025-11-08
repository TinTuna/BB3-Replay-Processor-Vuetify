import { ReplayStep } from "@/types/BaseTags/ReplayStep";

/**
 * Pre-processes replay steps to normalize arrays.
 * This ensures all StepResult and StringMessage fields are arrays,
 * eliminating the need for runtime checks throughout processing.
 *
 * This mutates the input array for performance reasons.
 */
export function normalizeReplaySteps(replaySteps: ReplayStep[]): void {
  for (const step of replaySteps) {
    // Normalize EventExecuteSequence to always be an array
    if (step.EventExecuteSequence && !Array.isArray(step.EventExecuteSequence)) {
      step.EventExecuteSequence = [step.EventExecuteSequence];
    }

    // Normalize nested StepResult and StringMessage arrays
    if (step.EventExecuteSequence) {
      for (const sequence of step.EventExecuteSequence) {
        // Normalize StepResult to always be an array
        if (sequence.Sequence.StepResult && !Array.isArray(sequence.Sequence.StepResult)) {
          sequence.Sequence.StepResult = [sequence.Sequence.StepResult];
        }

        // Normalize StringMessage in each StepResult
        if (sequence.Sequence.StepResult) {
          for (const result of sequence.Sequence.StepResult) {
            if (result.Results.StringMessage && !Array.isArray(result.Results.StringMessage)) {
              result.Results.StringMessage = [result.Results.StringMessage];
            }
          }
        }
      }
    }
  }
}
