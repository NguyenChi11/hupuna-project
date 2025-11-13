/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { Upload, Modal } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import dayjs from "dayjs";
import Image from "next/image";
import iconUpload from "@public/icons/upload.svg";
import iconDelete from "@public/icons/delete-item.svg";
import { ButtonBase } from "./button";
import { useToast } from "./toast";
import { InputBase } from "./input";
import { InputAreaBase } from "./textarea";
import { QRBase } from "./qr";
import { FileInfo } from "@/app/data/interface/file";
import { cookieBase } from "@/app/utils/cookie";
import { User } from "@/app/data/dataUser";
import FileLinksSection from "./link-file";

type UploadBaseProps = {
    defaultFiles?: FileInfo[];
    onChange?: (files: UploadFileWithLinks[]) => void;
    multiple?: boolean;
    accept?: string;
    maxSizeMB?: number;
    showLinks?: boolean;
    disabled?: boolean;
};

export type UploadFileWithLinks = UploadFile & {
    title?: string;
    description?: string;
    links?: string[];
    folder?: string;
    source?: string;
    key?: string;
    uploader?: string;
    uploadedAt?: string;
    updatedAt?: string;
};

export const UploadBase: React.FC<UploadBaseProps> = ({
    defaultFiles = [],
    onChange,
    multiple = true,
    accept = "*",
    maxSizeMB = 100,
    showLinks = false,
    disabled,
}) => {
    const toast = useToast();
    const user_info = cookieBase.get<User>("info_user");

    const [fileList, setFileList] = useState<UploadFileWithLinks[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentFile, setCurrentFile] = useState<UploadFileWithLinks | null>(
        null
    );
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [links, setLinks] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>();

    function generateUUID(): string {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    const handleRemove = (uid: string): void => {
        if (disabled) return;
        const newList = fileList.filter((f) => f.uid !== uid);
        setFileList(newList);
        onChange?.(newList);
    };

    const LIST_IGNORE = "LIST_IGNORE" as const;

    const beforeUpload = (file: RcFile): boolean | typeof LIST_IGNORE => {
        if (accept !== "*" && !file.type.match(accept.replace("*", ".*"))) {
            toast({
                type: "error",
                message: `Định dạng file không hợp lệ (${file.name})`,
                duration: 3000,
            });
            return LIST_IGNORE;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            toast({
                type: "error",
                message: `Dung lượng tối đa ${maxSizeMB}MB (${file.name})`,
                duration: 3000,
            });
            return LIST_IGNORE;
        }

        if (disabled) return LIST_IGNORE;

        const tempFile: UploadFileWithLinks = {
            uid: `${Date.now()}-${file.name}`,
            size: file.size ?? 0,
            originFileObj: file,
            name: file.name || "unknown_file", 
            type: file.type ?? "",
            title: file.name ?? "",
            description: "",
            links: [],
            folder: "",
            source: "quote",
            key: "",
            uploader: String(user_info?.name || "Người dùng A"),
            updatedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            uploadedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        };

        setCurrentFile(tempFile);
        setTitle(tempFile.title || "");
        setDescription(tempFile.description || "");
        setLinks(tempFile.links || []);
        setIsEditing(false);
        setModalVisible(true);

        return false;
    };
    const handleConfirmModal = async (): Promise<void> => {
        if (!currentFile || disabled) return;

        if (title.trim().length <= 5) {
            toast({
                type: "error",
                message: "Tiêu đề file phải dài hơn 5 ký tự.",
                duration: 3000,
            });
            return;
        }

        if (description.trim().length <= 5) {
            toast({
                type: "error",
                message: "Mô tả file phải dài hơn 5 ký tự.",
                duration: 3000,
            });
            return;
        }

        setLoading(true);
        try {
            const newFile: UploadFileWithLinks = {
                ...currentFile,
                title,
                description,
                links,
                folder: "",
                source: currentFile.source || "quote",
                uploader: currentFile.uploader || String(user_info?.name || ""),
                name: title,
                updatedAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                uploadedAt:
                    currentFile.uploadedAt || dayjs().format("DD/MM/YYYY HH:mm:ss"),
            };

            const newList = [
                ...fileList.filter((f) => f.uid !== currentFile.uid),
                newFile,
            ];
            setFileList(newList);
            onChange?.(newList);
        } catch (error) {
            toast({ type: "error", message: "Lỗi cập nhật file!", duration: 3000 });
            console.error(error);
        } finally {
            setLoading(false);
            setModalVisible(false);
            setCurrentFile(null);
            setLinks([]);
        }
    };

    const handleViewFile = async (file: UploadFileWithLinks): Promise<void> => {
        setCurrentFile(file);
        setTitle(file.title || "");
        setDescription(file.description || "");
        setLinks(file.links || []);
        setIsEditing(true);
        setModalVisible(true);
        setPreviewImageUrl(null);

        try {
            if (file.key && file.key.startsWith("https://mega.nz/")) {
                const apiUrl = `/api/mega/view?link=${encodeURIComponent(
                    file.key
                )}&title=${encodeURIComponent(file.type || "image/jpeg")}`;
                setPreviewImageUrl(apiUrl);
            }
        } catch (error) {
            console.error("Error creating preview URL:", error);
        }
    };

    const handleDownload = (): void => {
        if (!previewImageUrl || !currentFile?.title) {
            toast({
                type: "error",
                message: "Không thể tải file, URL không hợp lệ.",
            });
            return;
        }
        try {
            const link = document.createElement("a");
            link.href = previewImageUrl;
            link.setAttribute("download", currentFile.title);
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            toast({ type: "error", message: "Lỗi khi tải file." });
            console.error("Download error:", error);
        }
    };

    useEffect(() => {
        const fetchUrlsAndSetList = async (): Promise<void> => {
            if (!defaultFiles) {
                setFileList([]);
                return;
            }

            const newFileList: UploadFileWithLinks[] = await Promise.all(
                defaultFiles.map(async (f) => ({
                    uid: f.id ?? generateUUID(),
                    size: f.size ?? 0,
                    type: f.type ?? "",
                    title: f.title ?? "",
                    description: f.description ?? "",
                    links: f.links || [],
                    folder: f.folder ?? "",
                    key: f.key ?? "",
                    source: f.source || "quote",
                    originFileObj: f.originFileObj as RcFile | undefined,
                    uploader: f.uploader || String(user_info?.name || ""),
                    name: f.title ?? f.key ?? "unknown_file",
                }))
            );

            setFileList(newFileList);
        };

        fetchUrlsAndSetList();

        return () => {
            fileList.forEach((file) => {
                if (file.url && file.url.startsWith("blob:")) {
                    URL.revokeObjectURL(file.url);
                }
            });
        };
    }, [defaultFiles, user_info?.name]);

    return (
        <>
            <Upload.Dragger
                multiple={multiple}
                accept={accept}
                listType="text"
                fileList={fileList}
                beforeUpload={beforeUpload}
                onRemove={(file) => {
                    handleRemove(file.uid);
                    return false;
                }}
                className="w-full block"
                itemRender={(originNode, file) => {
                    const customFile = file as UploadFileWithLinks;
                    return (
                        <div className="w-full mb-2">
                            <div className="flex flex-col sm:flex-row justify-between items-start border border-gray-200 rounded-sm p-2 gap-2">
                                <div
                                    className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-[calc(100%-40px)] cursor-pointer"
                                    onClick={() => handleViewFile(customFile)}
                                >
                                    {(customFile.key?.startsWith("https://mega.nz/") ||
                                        customFile.thumbUrl) &&
                                        customFile.type?.startsWith("image/") ? (
                                        <img
                                            src={
                                                customFile.thumbUrl
                                                    ? customFile.thumbUrl
                                                    : `/api/mega/view?link=${encodeURIComponent(
                                                        customFile.key!
                                                    )}&title=${encodeURIComponent(
                                                        customFile.type || "image/jpeg"
                                                    )}`
                                            }
                                            alt={customFile.title}
                                            className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] object-cover rounded flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] flex items-center justify-center border border-gray-300 rounded bg-gray-50 flex-shrink-0">
                                            <span className="text-xs text-gray-600 font-medium text-center break-words max-w-[60px] sm:max-w-[80px]">
                                                {customFile.title?.split(".").pop()?.toUpperCase() ||
                                                    "FILE"}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex flex-col flex-1 min-w-0 max-w-full overflow-hidden">
                                        <p className="font-bold text-sm sm:text-base text-gray-800 break-all line-clamp-2">
                                            {customFile.title}
                                        </p>

                                        {customFile.description && (
                                            <p className="text-xs sm:text-sm text-gray-600 break-words line-clamp-2">
                                                Mô tả: {customFile.description}
                                            </p>
                                        )}

                                        <p className="text-xs text-gray-500 break-words">
                                            {customFile.uploader || user_info?.name || "Người dùng A"}{" "}
                                            —{" "}
                                            {dayjs(
                                                customFile.updatedAt || Date.now()
                                            ).format("DD/MM/YYYY HH:mm")}
                                        </p>

                                        {showLinks && customFile.links?.length ? (
                                            <div className="flex flex-col gap-1 mt-1">
                                                {customFile.links.map((link, index) => (
                                                    <a
                                                        key={index}
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline text-xs break-all"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {link}
                                                    </a>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="flex sm:self-center self-end sm:mt-0 mt-1">
                                    <ButtonBase
                                        onClick={() => !disabled && handleRemove(file.uid)}
                                        className="!p-[2px] rounded-full hover:bg-red-200 flex-shrink-0"
                                    >
                                        <Image src={iconDelete} width={16} height={16} alt="Xóa" />
                                    </ButtonBase>
                                </div>
                            </div>
                        </div>
                    );
                }}
            >
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 py-4 sm:py-2 text-center sm:text-left">
                    <Image src={iconUpload} width={24} height={24} alt="" />
                    <span className="text-sm sm:text-base">
                        Click hoặc kéo thả để tải file
                    </span>
                </div>
            </Upload.Dragger>

            <Modal
                title="Thông tin file"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={handleConfirmModal}
                okText={loading ? "Đang tải..." : isEditing ? "Lưu" : "Thêm"}
                okButtonProps={{ disabled: loading || disabled }}
                cancelButtonProps={{ disabled: loading }}
                className="max-w-full sm:max-w-lg"
            >
                {currentFile && (
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="font-semibold text-sm">Tiêu đề file</label>
                            <InputBase
                                placeholder="Nhập tiêu đề (trên 5 ký tự)..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={disabled}
                            />
                        </div>

                        {showLinks && (
                            <div>
                                <label className="font-semibold text-sm">Link Pacdora</label>
                                <FileLinksSection
                                    defaultLinks={links.length ? links : [""]}
                                    onChange={setLinks}
                                />
                            </div>
                        )}

                        <div>
                            <label className="font-semibold text-sm">Mô tả</label>
                            <InputAreaBase
                                placeholder="Nhập mô tả (trên 5 ký tự)..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                disabled={disabled}
                            />
                        </div>

                        {previewImageUrl && (
                            <div className="flex flex-col items-center gap-3">
                                {currentFile?.type?.startsWith("image/") && (
                                    <img
                                        src={previewImageUrl}
                                        alt={currentFile?.title || "File preview"}
                                        className="max-w-full max-h-[400px] object-contain rounded border border-gray-200"
                                    />
                                )}

                                <ButtonBase
                                    onClick={handleDownload}
                                    className="w-full bg-blue-500 text-white rounded hover:bg-blue-600 text-sm py-2 disabled:bg-gray-400"
                                >
                                    Tải file xuống
                                </ButtonBase>
                            </div>
                        )}
                        <div className="flex justify-center">
                            <QRBase value={currentFile?.key || ""} size={128} />
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};
