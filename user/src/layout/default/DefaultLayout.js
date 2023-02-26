const DefaultLayout = ({ children, name }) => {
    document.title = name || 'Fashion shop';
    return <div>{children}</div>;
};
export default DefaultLayout;
