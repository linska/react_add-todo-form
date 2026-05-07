import { User } from '../../types/User';
import { useState } from 'react';

interface NewTodoProps {
  userList: User[];
  onAdd: (title: string, userId: number) => void;
}

export const NewTodo = ({ userList, onAdd }: NewTodoProps) => {
  const [key, setKey] = useState(0);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<User['id']>(0);
  const [showError, setShowError] = useState(false);

  const isFormValid = title.trim().length > 0 && userId !== 0;

  function handleChangeTitle(value: string) {
    setTitle(value);
  }

  function handleSelectUser(value: User['id']) {
    if (value === userId) {
      return;
    }

    setUserId(value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!isFormValid) {
      setShowError(true);

      return;
    }

    setShowError(false);
    onAdd(title.trim(), userId);
    setTitle('');
    setUserId(0);
    setKey(prev => prev + 1);
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit} key={key}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Title"
          value={title}
          onChange={event => handleChangeTitle(event.target.value)}
        />
        {showError && !title.trim() && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => handleSelectUser(Number(event.target.value))}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {userList.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {showError && userId === 0 && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
