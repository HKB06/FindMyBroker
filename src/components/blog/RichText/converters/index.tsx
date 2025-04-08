  import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
  import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
  import { internalDocToHref } from '@/components/blog/RichText/converters/internalLink'
  import { headingConverter } from '@/components/blog/RichText/converters/headingConverter'
  
  type NodeTypes = DefaultNodeTypes | SerializedBlockNode
  
  
  export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({defaultConverters}) => ({
    ...defaultConverters,
    ...LinkJSXConverter({internalDocToHref}),
    ...headingConverter,
  })