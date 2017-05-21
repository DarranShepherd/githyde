export interface Build {
    commit: string;
    created: Date;
    duration: number;
    error?: {
        message: string;
    };
    pusher: User;
    status: string; // 'built'
    updated: Date;
    url: string;
}

export interface Page {
  name: string;
};

export interface Post {
  name: string;
}

export interface Repository {
  id: number;
  name: string;
  hasPages: boolean;
  owner: User;
}

export interface User {
  id: number;
  login: string;
}
