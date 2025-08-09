"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Mail, Lock, LogOut, ToggleRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { IUser } from "@/types/users"
import { formatDate } from "@/utils/common"

interface UserColumnsProps {
  onEdit?: (user: IUser) => void
  onDelete?: (userId: string) => void
  onSendVerificationEmail?: (userId: string) => void
  onResetPasswordLink?: (userId: string) => void
  onRevokeSessions?: (userId: string) => void
  onToggleStatus?: (userId: string) => void
}

export const createUserColumns = ({
  // onEdit,
  // onDelete,
  onSendVerificationEmail,
  onResetPasswordLink,
  onRevokeSessions,
  onToggleStatus
}: UserColumnsProps): ColumnDef<IUser>[] => [
  {
    accessorKey: "_id",
    header: "ID người dùng",
    cell: ({ row }) => <div className="font-mono text-xs text-muted-foreground">{row.getValue("_id")}</div>
  },
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>
  },
  {
    accessorKey: "customer_code",
    header: "Mã khách hàng",
    cell: ({ row }) => <div>{row.getValue("customer_code")}</div>
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>
  },
  {
    accessorKey: "phone_number",
    header: "Số điện thoại",
    cell: ({ row }) => <div>{row.getValue("phone_number") || "N/A"}</div>
  },
  {
    accessorKey: "is_active",
    header: "Trạng thái",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active")
      return (
        <Badge variant={isActive ? "default" : "destructive"}>
          {isActive ? "Hoạt động" : "Không hoạt động"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "verify",
    header: "Xác thực",
    cell: ({ row }) => {
      const isVerified = row.getValue("verify")
      return (
        <Badge variant={isVerified ? "default" : "secondary"}>
          {isVerified ? "Đã xác thực" : "Chưa xác thực"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "role",
    header: "Vai trò",
    cell: ({ row }) => <div>{row.getValue("role") === "admin" ? "Quản trị" : "Khách hàng"}</div>
  },
  {
    accessorKey: "lastLogin",
    header: "Lần đăng nhập cuối",
    cell: ({ row }) => {
      const lastLogin = row.getValue("lastLogin") as string
      return <div className="text-sm">{lastLogin ? formatDate(lastLogin) : "Chưa từng"}</div>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Hành động",
    cell: ({ row }) => {
      const user = row.original

      // const handleEdit = () => {
      //   onEdit?.(user)
      // }

      // const handleDelete = () => {
      //   onDelete?.(user._id)
      // }

      const handleSendVerificationEmail = () => {
        onSendVerificationEmail?.(user._id)
      }

      const handleResetPasswordLink = () => {
        onResetPasswordLink?.(user._id)
      }

      const handleRevokeSessions = () => {
        onRevokeSessions?.(user._id)
      }

      const handleToggleStatus = () => {
        onToggleStatus?.(user._id)
      }

      return (
        <div className="flex items-center gap-2">
          {/* <Button onClick={handleEdit} size="icon" variant="outline" title="Chỉnh sửa">
            <Edit className="h-4 w-4" />
          </Button> */}
          <Button onClick={handleSendVerificationEmail} size="icon" variant="outline" title="Gửi email xác thực">
            <Mail className="h-4 w-4" />
          </Button>
          <Button onClick={handleResetPasswordLink} size="icon" variant="outline" title="Đặt lại mật khẩu">
            <Lock className="h-4 w-4" />
          </Button>
          <Button onClick={handleRevokeSessions} size="icon" variant="outline" title="Thu hồi phiên">
            <LogOut className="h-4 w-4" />
          </Button>
          <Button onClick={handleToggleStatus} size="icon" variant="outline" title="Chuyển đổi trạng thái">
            <ToggleRight className="h-4 w-4" />
          </Button>
          {/* <Button onClick={handleDelete} size="icon" variant="destructive" title="Xóa">
            <Trash2 className="h-4 w-4" />
          </Button> */}
        </div>
      )
    }
  }
]