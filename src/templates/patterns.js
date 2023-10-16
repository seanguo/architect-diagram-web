export default [
    {
        "name": "Broadcast messaging",
        "link": "https://learn.microsoft.com/en-us/previous-versions/msp-n-p/dn589781(v=pandp.10)",
        "commands": [
            {
                "command": "create kafka_producer 210 20",
                "description": "create Kafka producer"
            },
            {
                "command": "create kafka_server 210 210",
                "description": "create Kafka server"
            },
            {
                "command": "connect arc_node_0 arc_node_1",
                "description": "connect Kafka producer with Kafka server"
            },
            {
                "command": "create kafka_consumer 10 410",
                "description": "create Kafka consumer 1"
            },
            {
                "command": "create kafka_consumer 430 410",
                "description": "create Kafka consumer 2"
            },
            {
                "command": "connect arc_node_1 arc_node_2",
                "description": "connect Kafka consumer 1 with Kafka server"
            },
            {
                "command": "connect arc_node_1 arc_node_3",
                "description": "connect Kafka consumer 2 with Kafka server"
            }
        ]
    },
    {
        "name": "Compete consumers",
        "link": "https://learn.microsoft.com/en-us/previous-versions/msp-n-p/dn589781(v=pandp.10)",
        "commands": [
            {
                "command": "create kafka_producer 210 20",
                "description": "create Kafka producer"
            },
            {
                "command": "create kafka_server 210 210",
                "description": "create Kafka server"
            },
            {
                "command": "connect arc_node_0 arc_node_1",
                "description": "connect Kafka producer with Kafka server"
            },
            {
                "command": "create kafka_consumer 10 410",
                "description": "create Kafka consumer 1"
            },
            {
                "command": "create kafka_consumer 430 410",
                "description": "create Kafka consumer 2"
            },
            {
                "command": "connect arc_node_1 arc_node_2",
                "description": "connect Kafka consumer 1 with Kafka server"
            },
            {
                "command": "connect arc_node_1 arc_node_3",
                "description": "connect Kafka consumer 2 with Kafka server"
            }
        ]
    }
]