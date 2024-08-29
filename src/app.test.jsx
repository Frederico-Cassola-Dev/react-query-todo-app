import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';
import useGetAllTasks from './hooks/useGetAllTasks';
import useAddTask from './hooks/useAddTask';
import useDeleteTask from './hooks/useDeleteTask';

// Mock hooks
vi.mock('./hooks/useGetAllTasks');
vi.mock('./hooks/useAddTask');
vi.mock('./hooks/useDeleteTask');

describe('App component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('renders the App component with initial tasks', () => {
    useGetAllTasks.mockReturnValue({
      data: [{ id: 1, title: 'Test Task 1' }],
      isLoading: false,
    });

    render(<App />);
    expect(screen.getByText('React-Query Learning')).toBeInTheDocument();
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
  });

  it('adds a new task when the "Add new post" button is clicked', () => {
    const addTaskMock = vi.fn();
    useAddTask.mockReturnValue({
      mutate: addTaskMock,
      // isPending: false, // Ensure `isPending` is defined
    });

    useGetAllTasks.mockReturnValue({
      data: [],
      // isPending: false,
    });

    render(<App />);

    const input = screen.getByRole('textbox');
    const addButton = screen.getByText('Add new post');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(addTaskMock).toHaveBeenCalledWith('New Task');
  });

  it('deletes the last task when the "Delete last post" button is clicked', () => {
    const deleteTaskMock = vi.fn();
    useDeleteTask.mockReturnValue({
      mutate: deleteTaskMock,
      // isPending: false, // Ensure `isPending` is defined
    });

    useGetAllTasks.mockReturnValue({
      data: [{ id: 1, title: 'Test Task 1' }],
      // isPending: false,
    });

    render(<App />);

    const deleteButton = screen.getByText('Delete last post');
    fireEvent.click(deleteButton);

    expect(deleteTaskMock).toHaveBeenCalledWith(1); // Assuming the last task has an ID of 1
  })
})



