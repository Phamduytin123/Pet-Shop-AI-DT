import { Flex, Spin } from "antd";

export default function Loading({ children }) {
    return (
        <Flex justify='center' align="center" style={{ height: '100%', width: '100%' }}>
            {children
                ? <Spin size="large">{children}</Spin>
                : <Spin size="large" />
            }
        </Flex>
    )
}