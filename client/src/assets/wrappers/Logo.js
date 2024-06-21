import styled from 'styled-components';

const Wrapper = styled.aside`
.logo{
    max-width: 500px; /* Ensures the logo scales down responsively */
    height: auto;    /* Maintains aspect ratio */
    display: block;  /* Removes bottom space for inline images */
    max-height: 80px; /* Adjust max height as needed */
}

/* Optional: Adding some additional styles for different screen sizes */
@media (max-width: 600px) {
    .logo img {
        max-height: 40px; /* Smaller logo on small screens */
    }
`;
export default Wrapper;