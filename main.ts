type User = {
  username: string;
  password: string;
};

type Guest = {
  sessionId: string;
};

type Admin = {
  readonly role: "admin";
  username: string;
  password: string;
};

type ExternalUser = {
  oauthToken: string;
};

type LoginType = User | Guest | Admin | ExternalUser;

function login(entity: LoginType): void {
  if ("username" in entity && !("role" in entity)) {
    entity = entity as User;
    console.log(`You authorized as ${entity.username}`);
    return;
  }
  if ("sessionId" in entity) {
    entity = entity as Guest;
    console.log(
      `You authorized as a guest. Your session id is: ${entity.sessionId}`
    );
    return;
  }
  if ("role" in entity) {
    entity = <Admin>entity;
    console.log(`You authorized with the rights of admin ${entity.username}`);
  }
  if ("oauthToken" in entity) {
    entity = <ExternalUser>entity;
    console.log(`You authorized as an external user`);
  }
}

const nightStalker: User = {
  username: "Night Stalker",
  password: "qwerty12345",
};
login(nightStalker);

const stranger: Guest = { sessionId: "84266fdbd31d4c2c6d0665f7e8380fa3" };
login(stranger);

const superAdmin: Admin = {
  role: "admin",
  username: "admin#32",
  password: "A*29DQ[1£Y.z",
};
login(superAdmin);

const noName: ExternalUser = {
  oauthToken: "client_id=acmepaymentscorp-3rCEQzwEHMT9PPvuXcClpe3v&",
};
login(noName);
