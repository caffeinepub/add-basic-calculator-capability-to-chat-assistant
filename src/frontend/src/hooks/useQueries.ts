import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useAnswerQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (question: string) => {
      if (!actor) {
        throw new Error('Backend actor not initialized');
      }
      if (!question.trim()) {
        throw new Error('Question cannot be empty');
      }
      return await actor.answerQuestion(question);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}
