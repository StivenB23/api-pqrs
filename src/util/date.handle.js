/**
 * it is takes care of formatting the date to local timezone
 * @returns date locale formated
 */
const dateFormat = () => {
    let dateFormat = new Intl.DateTimeFormat("es", {
        dateStyle: 'medium',
        timeStyle: 'medium',
        timeZone: "America/Bogota"
    });
    let date = dateFormat.format(new Date());
    return new Date(date);
}
export { dateFormat }