import axiosClient from '@/configs/axios'
import type { IResponseData, IUploadResponse } from '@/types'

export const uploadApis = {
	uploadFile: async (files: File[]): Promise<IResponseData<IUploadResponse[]>> => {
		const formData = new FormData()
		files.forEach((file) => {
			formData.append('images', file)
		})

		return axiosClient.post('/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	removeFile: async (publicId: string) => {
		return axiosClient.delete(`/upload/${publicId}`)
	}
}