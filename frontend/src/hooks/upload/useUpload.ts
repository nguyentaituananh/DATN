import { uploadApis } from '@/services/upload/upload'
import { useMutation } from '@tanstack/react-query'

export const useUploadFiles = () => {
	return useMutation({
		mutationFn: async (files: File[]) => uploadApis.uploadFile(files)
	})
}

export const useRemoveFile = () => {
	return useMutation({
		mutationFn: async (publicId: string) => uploadApis.removeFile(publicId)
	})
}