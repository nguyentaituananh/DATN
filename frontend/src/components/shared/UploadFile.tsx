'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { UploadCloud, FileText, XCircle, ImageIcon, Trash2, Eye } from 'lucide-react'
import { useUploadFiles } from '@/hooks/upload/useUpload'
import type { IUploadResponse } from '@/types'

interface UploadFileProps {
	title?: string
	setFilesUploaded?: React.Dispatch<React.SetStateAction<IUploadResponse[]>>
	setUploadedImages?: React.Dispatch<React.SetStateAction<IUploadResponse[]>>
	initialImages?: IUploadResponse[]
}

export default function UploadFile({ setFilesUploaded, title, initialImages = [] }: UploadFileProps) {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([])
	const [uploadedImages, setUploadedImages] = useState<IUploadResponse[]>(initialImages)
	const [deletingImageId, setDeletingImageId] = useState<string | null>(null)
	const [isDragOver, setIsDragOver] = useState(false)
	const { mutate: uploadFiles, isPending } = useUploadFiles()

	// Sync initialImages with uploadedImages state
	useEffect(() => {
		setUploadedImages(initialImages)
	}, [initialImages])

	// Drag and drop handlers
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragOver(true)
	}

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragOver(false)
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragOver(false)

		const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
			file.type.startsWith('image/')
		)

		if (droppedFiles.length > 0) {
			setSelectedFiles(prev => [...prev, ...droppedFiles])
		}
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(event.target.files as FileList)])
		}
	}

	const handleRemoveFile = (fileToRemove: File) => {
		setSelectedFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove))
	}

	const handleDeleteUploadedImage = (publicId: string) => {
		setDeletingImageId(publicId)
		// Simulate delete delay for better UX
		setTimeout(() => {
			const updatedImages = uploadedImages.filter((image) => image.public_id !== publicId)
			setUploadedImages(updatedImages)
			setFilesUploaded?.(updatedImages) // Update parent with remaining images
			setDeletingImageId(null)
		}, 300)
	}

	const handleUpload = () => {
		if (selectedFiles.length === 0) return

		uploadFiles(selectedFiles, {
			onSuccess: (response) => {
				const newImages = response.metadata
				const allImages = [...uploadedImages, ...newImages]
				setUploadedImages(allImages)
				setSelectedFiles([])
				setFilesUploaded?.(allImages) // Pass all images including existing ones
			},
			onError: (error) => {
				console.error('Upload failed:', error)
			}
		})
	}

	console.log(uploadedImages);


	return (
		<Card className="w-full mx-auto shadow-lg rounded-lg">
			<CardHeader className="p-4 border-b">
				<CardTitle className="text-xl font-bold flex items-center gap-2">
					<UploadCloud className="h-5 w-5 text-primary" /> {title ?? 'Tải lên Files'}
				</CardTitle>
				<CardDescription className="text-sm">
					Chọn một hoặc nhiều file để tải lên máy chủ của bạn.
				</CardDescription>
			</CardHeader>
			<CardContent className="p-4 space-y-4">
				<div className="grid w-full items-center gap-2">
					<label
						htmlFor="files"
						className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${isDragOver
								? 'border-primary bg-primary/5'
								: 'border-border bg-background hover:bg-muted'
							}`}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						<div className="flex flex-col items-center justify-center pt-4 pb-5">
							<UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
							<p className="mb-1 text-sm text-muted-foreground">
								<span className="font-semibold">{'Nhấn để tải lên'}</span> {'hoặc kéo và thả'}
							</p>
							<p className="text-xs text-muted-foreground">{'Hỗ trợ nhiều định dạng (PDF, JPG, PNG)'}</p>
						</div>
						<Input id="files" type="file" multiple onChange={handleFileChange} className="hidden" />
					</label>
				</div>
				{selectedFiles.length > 0 && (
					<div className="space-y-2">
						<p className="font-semibold text-foreground">
							{'Các File đã chọn (' + selectedFiles.length + '):'}
						</p>
						<ul className="space-y-1">
							{selectedFiles.map((file, index) => (
								<li
									key={index}
									className="flex items-center justify-between p-2 border border-border rounded-md bg-card shadow-sm"
								>
									<div className="flex items-center gap-2">
										<FileText className="h-4 w-4 text-chart-2" />
										<span className="text-sm font-medium text-foreground">{file.name}</span>
										<span className="text-xs text-muted-foreground">
											({(file.size / 1024).toFixed(2)} KB)
										</span>
									</div>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => handleRemoveFile(file)}
										className="text-muted-foreground hover:text-destructive"
										aria-label={`Remove ${file.name}`}
									>
										<XCircle className="h-3 w-3" />
									</Button>
								</li>
							))}
						</ul>
					</div>
				)}
				{isPending && (
					<div className="space-y-2 pt-3">
						<Progress value={50} className="w-full h-2 bg-primary/20" />{' '}
						<p className="text-sm text-muted-foreground text-center animate-pulse">
							{'Đang tải lên các file...'}
						</p>
					</div>
				)}
				{uploadedImages.length > 0 ? (
					<div className="space-y-2 pt-3 border-t mt-4">
						<p className="font-semibold text-foreground flex items-center gap-2">
							<ImageIcon className="h-4 w-4 text-green-600" /> {'Hình ảnh đã tải lên:'}
							<span className="text-sm font-normal text-muted-foreground">({uploadedImages.length})</span>
						</p>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
							{uploadedImages.map((image, index) => (
								<div key={image.public_id || index} className="relative group">
									<img
										src={image.url || '/placeholder.svg'}
										alt={`Uploaded image ${index + 1}`}
										className={`w-full h-20 object-cover rounded-md border border-border transition-opacity ${deletingImageId === image.public_id ? 'opacity-50' : ''
											}`}
									/>
									{deletingImageId === image.public_id && (
										<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
										</div>
									)}
									{deletingImageId !== image.public_id && (
										<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
											<div className="flex items-center gap-2">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => window.open(image.url, '_blank')}
													className="text-white hover:text-blue-300"
													aria-label={`Preview ${image.public_id}`}
												>
													<Eye className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleDeleteUploadedImage(image.public_id)}
													className="text-white hover:text-destructive"
													aria-label={`Delete ${image.public_id}`}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				) : (
					selectedFiles.length === 0 && !isPending && (
						<div className="space-y-2 pt-3 border-t mt-4">
							<p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
								<ImageIcon className="h-4 w-4" />
								Chưa có hình ảnh nào được tải lên
							</p>
						</div>
					)
				)}
			</CardContent>
			<CardFooter className="p-4 flex justify-end border-t">
				<Button
					onClick={handleUpload}
					disabled={isPending || selectedFiles.length === 0}
					className="px-5 py-2 text-sm"
					type="button"
				>
					{isPending ? 'Đang tải lên...' : 'Tải lên File'}
				</Button>
			</CardFooter>
		</Card>
	)
}