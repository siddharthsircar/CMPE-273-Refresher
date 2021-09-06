// Using EXPORT
export default function getFirstLetter(n) {
    return n.slice(0, 1);
};

export function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}