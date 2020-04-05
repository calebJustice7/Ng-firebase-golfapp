export class Player {
    public scores = Array(18).fill(0);

    constructor(
        public firstName: string,
        public lastName: string,
        public nickName: string,
        public age: string
    ) {
    }
}
