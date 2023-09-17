import styled from 'styled-components';

export const DayTodoListWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap.m}px;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ListHeader = styled.div`
  text-align: left;
`;

export const TodoInput = styled.input`
  padding: ${({ theme }) => theme.padding.m}px;
  font-size: ${({ theme }) => theme.fontSize.s}px;
`;

export const AddButton = styled.button`
  border-radius: 5px;
  padding: ${({ theme }) => theme.padding.m}px;
`;

export const TodoListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap.m}px;
`;

export const TodoContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const TodoTitle = styled.span`
  width: 150px;
  overflow-wrap: break-word;
`;

export const NoTaskContainer = styled.p`
  text-align: center;
`;
