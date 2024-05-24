import NextLink from "next/link";

export default function AppLogo() {
    return (
        <NextLink href={'/projects'}>
            <img src={`/logo.png`} style={{ width: '48px', height: 'auto'  }} />
        </NextLink>
    )
}
