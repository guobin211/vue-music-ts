/**
 * RouterGuard
 * @author guobin201314@gmail.com on 2019-04-16
 */

interface RouterConfig {
    fullPath: string;
    name: string;
    path: string;
    query: any;
}

export interface ILoginUser {
    userName: string;
    password: string;
    canActiveIds: number[];
}

export interface ICanActive {
    name: string;
    path: string;
    id: number;
}

class RouterGuard {

    private loginUser: ILoginUser;

    private readonly canActiveData: Map<string, number>;

    constructor(user: ILoginUser, canActivate: ICanActive[]) {
        this.loginUser = user;
        this.canActiveData = this.buildCanActiveData(canActivate);
    }

    public changeLoginUser(user: ILoginUser) {
        this.loginUser = user;
    }

    public match(to: RouterConfig | any, from: RouterConfig | any): boolean {
        if (this.canActiveData.has(to.name)) {
            const id = this.canActiveData.get(to.name) || 0;
            return this.loginUser.canActiveIds.includes(id);
        } else {
            return false;
        }
    }

    private buildCanActiveData(canActivate: ICanActive[]) {
        const res = new Map();
        for (const el of canActivate) {
            res.set(el.name, el.id);
        }
        return res;
    }
}

export const routerGuard = new RouterGuard(
    {
        userName: 'admin',
        password: 'admin888',
        canActiveIds: [1, 2, 3, 4, 5],
    },
    [
        {name: 'home', path: '/home', id: 1},
        {name: 'index', path: '/index', id: 2},
        {name: 'vuex', path: '/vuex', id: 3},
    ],
);

