
  import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
  import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
  import { headingConverter } from '@/components/global/RichText/converters/headingConverter'
  
  type NodeTypes = DefaultNodeTypes | SerializedBlockNode
  
  
  export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({defaultConverters}) => ({
    ...defaultConverters,
    ...headingConverter,
  })