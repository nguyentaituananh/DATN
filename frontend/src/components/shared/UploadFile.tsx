'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { UploadCloud, FileText, XCircle, ImageIcon } from 'lucide-react' // Thêm icon Image
import { useUploadFiles } from '@/hooks/upload/useUpload'
import type { IUploadResponse } from '@/types'

export default function UploadFile() {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([])
	const [uploadedImages, setUploadedImages] = useState<IUploadResponse[]>([])

	const { mutate: uploadFiles, isPending } = useUploadFiles()

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setSelectedFiles(Array.from(event.target.files))
		}
	}

	const handleRemoveFile = (fileToRemove: File) => {
		setSelectedFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove))
	}

	const handleUpload = () => {
		if (selectedFiles.length === 0) return
		uploadFiles(selectedFiles, {
			onSuccess: (response) => {
				setUploadedImages((prev) => [...prev, ...response.metadata])
				setSelectedFiles([]) // Clear selected files after successful upload
			},
			onError: (error) => {
				console.error('Upload failed:', error)
			}
		})
	}

	return (
		<Card className="w-full max-w-md mx-auto shadow-lg rounded-lg">
			<CardHeader className="border-b pb-4">
				<CardTitle className="text-2xl font-bold flex items-center gap-2">
					<UploadCloud className="h-6 w-6 text-primary" /> Tải lên File
				</CardTitle>
				<CardDescription>Chọn một hoặc nhiều file để tải lên máy chủ của bạn.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6 py-6">
				<div className="grid w-full items-center gap-2">
					<label
						htmlFor="files"
						className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
					>
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
							<p className="mb-2 text-sm text-gray-500">
								<span className="font-semibold">Nhấn để tải lên</span> hoặc kéo và thả
							</p>
							<p className="text-xs text-gray-500">Hỗ trợ nhiều định dạng (PDF, JPG, PNG, DOCX, v.v.)</p>
						</div>
						<Input id="files" type="file" multiple onChange={handleFileChange} className="hidden" />
					</label>
				</div>

				{selectedFiles.length > 0 && (
					<div className="space-y-3">
						<p className="font-semibold text-gray-700">Các File đã chọn ({selectedFiles.length}):</p>
						<ul className="space-y-2">
							{selectedFiles.map((file, index) => (
								<li
									key={index}
									className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white shadow-sm"
								>
									<div className="flex items-center gap-3">
										<FileText className="h-5 w-5 text-blue-500" />
										<span className="text-sm font-medium text-gray-800">{file.name}</span>
										<span className="text-xs text-gray-500">
											({(file.size / 1024).toFixed(2)} KB)
										</span>
									</div>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => handleRemoveFile(file)}
										className="text-gray-400 hover:text-red-500"
										aria-label={`Remove ${file.name}`}
									>
										<XCircle className="h-4 w-4" />
									</Button>
								</li>
							))}
						</ul>
					</div>
				)}

				{isPending && (
					<div className="space-y-2 pt-4">
						<Progress value={50} className="w-full h-2 bg-blue-200" />{' '}
						{/* Giá trị 50% chỉ là mô phỏng tiến độ, bạn có thể cập nhật nó từ API */}
						<p className="text-sm text-muted-foreground text-center animate-pulse">
							Đang tải lên các file...
						</p>
					</div>
				)}

				{uploadedImages.length > 0 && (
					<div className="space-y-3 pt-4 border-t mt-6">
						<p className="font-semibold text-gray-700 flex items-center gap-2">
							<ImageIcon className="h-5 w-5 text-green-600" /> Hình ảnh đã tải lên:
						</p>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
							{uploadedImages.map((image, index) => (
								<div key={image.public_id || index} className="relative group">
									<img
										src={image.url || '/placeholder.svg'}
										alt={`Uploaded image ${index + 1}`}
										className="w-full h-24 object-cover rounded-md border border-gray-200"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
										<a
											href={image.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-white text-sm px-2 py-1 rounded-full bg-blue-500 hover:bg-blue-600"
										>
											Xem
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</CardContent>
			<CardFooter className="flex justify-end border-t pt-4">
				<Button onClick={handleUpload} disabled={isPending || selectedFiles.length === 0} className="px-6 py-2">
					{isPending ? 'Đang tải lên...' : 'Tải lên File'}
				</Button>
			</CardFooter>
		</Card>
	)
}
