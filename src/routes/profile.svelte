<!-- <script>

    export let group;
    export let user;
    export let editing;
    export let save;
    export let back;

</script>
/* eslint-disable camelcase */
import { useState } from 'react';
import { useStore } from '../store';
import { useTheme } from '../theme';
import * as UI from './ui';
import { ProfileProps } from '../types';

function Profile({ group, user, editing, save, back }: ProfileProps): JSX.Element {
  const store = useStore();
  const theme = useTheme();

  if (group && !user) {
    if (editing) {
      console.log('editing group');
    } else {
      console.log('viewing group');
    }
  } else if (!group && user) {
    if (editing) {
      console.log('editing your profile');
    } else {
      console.log('viewing user');
    }
  } else {
    console.log('error');
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenColors, setIsOpenColors] = useState(false);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const colors = ['red', 'pink', 'purple', 'indigo', 'blue', 'green', 'yellow', 'gray'];

  const saveChanges = () => {
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const editedUser: any = {};

      if (name !== '') {
        editedUser.name = name;
      }
      if (username !== '') {
        editedUser.username = username;
      }
      if (email !== '') {
        editedUser.email = email;
      }

      if (theme === 'color') {
        editedUser.theme = store.get('color');
      } else {
        editedUser.theme = theme;
      }
      save(editedUser);
      back();
    } else {
      console.log('Not implemented yet!');
    }
  };

  return (
    <div className={`flex-1 h-full flex flex-col bg-${theme.form.bg}`}>
      <UI.Header>
        <UI.HeaderIcon name="arrow_back" onClick={() => back()} />
        <div className="text-left text-xl flex-1 ml-4">
          {user && (editing ? 'Edit Profile' : 'View Profile')}
          {group && (editing ? 'Edit Group' : 'View Group')}
        </div>
        {editing && <UI.HeaderIcon name="done" onClick={saveChanges} />}
      </UI.Header>
      <div className="flex-1 overflow-y-scroll">
        {user && (
          <div className="flex mx-auto flex-col">
            <div className="h-auto flex-1 m-4">
              <img
                src={user.profile}
                alt="profile of user"
                className="w-1/2 h-1/2 mx-auto mt-16 rounded-full"
              />
              <UI.FormInput type="file" name="file" label="Choose Profile" />
            </div>
            <div className="flex flex-col flex-1 m-8 justify-center">
              {editing && (
                <>
                  <UI.FormInput
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="Name: "
                    type="text"
                  />
                  <UI.FormInput
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    label="Username: "
                    type="text"
                  />
                  <UI.FormInput
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email: "
                    type="email"
                  />
                </>
              )}
              {!editing && (
                <>
                  <div>Name: {user.name}</div>
                  <div>UserName: {user.username}</div>
                </>
              )}
            </div>
          </div>
        )}

        {editing && (
          <div className={`flex flex-col text-${theme.form.label.text}`}>
            <h1 className="text-3xl  font-bold m-4">Theme: </h1>
            <div className="">
              <div className="mb-8">
                <div className="flex flex-col items-start">
                  <p className="ml-4 sm:ml-12 my-2">
                    <b className="text-lg">Mode: </b>
                    <span className="text-sm">({store.get('theme')})</span>
                  </p>
                  <UI.Button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`ml-8 px-4 p-2 rounded hover:bg-gray-300 shadow transition bg-gray-400 ${
                      isOpen ? 'hidden' : ''
                    }`}
                  >
                    Change Mode
                  </UI.Button>
                  <ul className={`mx-2 flex flex-row items-center ${isOpen ? '' : 'hidden'}`}>
                    <UI.Button
                      className="p-2 px-4 border border-gray-300 mx-2 bg-gray-600 rounded"
                      onClick={() => {
                        setIsOpen(false);
                        store.set('theme', 'dark');
                      }}
                    >
                      Dark
                    </UI.Button>
                    <UI.Button
                      className="p-2 px-4 border border-gray-300 bg-gray-300 mx-2 rounded"
                      onClick={() => {
                        setIsOpen(false);
                        store.set('theme', 'light');
                      }}
                    >
                      Light
                    </UI.Button>
                    <UI.Button
                      className={`p-2 px-4 border border-gray-300 bg-${store.get(
                        'color'
                      )}-400 mx-2 rounded`}
                      onClick={() => {
                        setIsOpen(false);
                        store.set('theme', 'color');
                      }}
                    >
                      Color
                    </UI.Button>
                  </ul>
                </div>
              </div>
              {store.get('theme') === 'color' && (
                <div className="mb-8">
                  <div className="flex flex-col items-start">
                    <p className="ml-4 sm:ml-12 my-2">
                      <b className="text-lg">Color: </b>
                      <span className="text-sm">({store.get('color')})</span>
                    </p>
                    <UI.Button
                      onClick={() => setIsOpenColors(!isOpenColors)}
                      className={`ml-8 px-4 p-2 rounded shadow transition ${
                        isOpenColors ? 'hidden' : ''
                      }`}
                    >
                      Change Color
                    </UI.Button>
                    <ul
                      className={`mx-2 flex flex-row items-center ${isOpenColors ? '' : 'hidden'}`}
                    >
                      {colors.map((color) => (
                        <div
                          className={`w-8 h-8 rounded-full m-1 bg-${color}-400`}
                          onClick={() => {
                            setIsOpenColors(false);
                            store.set('color', color);
                          }}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* {status === 'success' && self && self.id === chatId && (
      <div>Editing your profile: {JSON.stringify(self)}</div>
    )} */}
      </div>
    </div>
  );

  // useQuery
  // useMutation

  // return (
  //   <div>
  //     Profile of: {chatId}
  //   </div>
  // ) -->
