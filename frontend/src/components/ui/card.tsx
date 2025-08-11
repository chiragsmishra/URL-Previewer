"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const PreviewCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950",
      className
    )}
    {...props}
  />
))
PreviewCard.displayName = "PreviewCard"

const PreviewCardImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn(
      "aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105",
      className
    )}
    {...props}
  />
))
PreviewCardImage.displayName = "PreviewCardImage"

const PreviewCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight text-gray-900 dark:text-gray-100",
      className
    )}
    {...props}
  />
))
PreviewCardTitle.displayName = "PreviewCardTitle"

const PreviewCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "pt-2 text-sm text-gray-600 dark:text-gray-400",
      className
    )}
    {...props}
  />
))
PreviewCardDescription.displayName = "PreviewCardDescription"

const PreviewCardSiteName = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "pb-2 text-xs font-medium text-gray-500 dark:text-gray-500",
      className
    )}
    {...props}
  />
))
PreviewCardSiteName.displayName = "PreviewCardSiteName"

export {
  PreviewCard,
  PreviewCardImage,
  PreviewCardTitle,
  PreviewCardDescription,
  PreviewCardSiteName,
}
