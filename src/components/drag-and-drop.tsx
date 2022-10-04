import React from 'react'
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps
} from 'react-beautiful-dnd'

type DropProps = Omit<DroppableProps, 'children'> & {
  children: React.ReactNode
}

const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {provided => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ...provided,
            ref: provided.innerRef
          })
        }
        return <div></div>
      }}
    </Droppable>
  )
}

type DropChildProps = Partial<
  {
    provided: DroppableProvided
  } & DroppableProvidedProps
> &
  React.HtmlHTMLAttributes<HTMLDivElement>

export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
)
DropChild.displayName = 'DropChild'

type DragProps = Omit<DraggableProps, 'children'> & {
  children: React.ReactNode
}
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {provided => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef
          })
        }
        return <div />
      }}
    </Draggable>
  )
}

export default Drop
