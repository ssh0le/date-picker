import styled from 'styled-components';

export const DayTodoListWrapper = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
`

export const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const ListHeader = styled.div`
    text-align: left;
`

export const TodoInput = styled.input`
    padding: 5px;
    font-size: 14px;
`

export const AddButton = styled.button`
    border-radius: 5px;
`

export const TodoListContainer = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const TodoContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`

export const TodoTitle = styled.span`
    width: 150px;
    overflow-wrap: break-word;
`

export const Icon = styled.img`
`

export const NoTaskContainer = styled.p`
    text-align: center
`