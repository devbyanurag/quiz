export const randomizeOption = (optionList: string[]): string[] => {
    for (let i = optionList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionList[i], optionList[j]] = [optionList[j], optionList[i]];
    }
    return optionList;
};