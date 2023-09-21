type tEventListPageSortParams = {
    sort: string, // "created_at"
    sortType: number, // 0 or 1
};

type tEventListPageParams = {
    /**
     * page index
     */
    current: number,
    /**
     * page size
     */
    size: number,
    /**
     * sort rule list
     */
    sorts: tEventListPageSortParams[],
    status: number[],
    type: eventTypeEnum,
    userId: number,
};

const resEventList = {
    "records": [
        {
            "id": 1451,
            "type": 1,
            "name": "Pt:Storm Barcer",
            "autoId": null,
            "status": 3,
            "transferFrom": "",
            "transferTo": "",
            "createdBy": 363,
            "createdAt": 1692949221075,
            "updatedBy": 363,
            "updatedAt": 1692949221075,
            "eventEquipments": [
                {
                    "imageUrl": "https://assets.seedslabs.io/ipfs/baofengbingyan.png",
                    "isNft": 2,
                    "itemType": 1,
                    "mintAddress": "A1hka5SW7eqrrUz6d976AcQTgF9RA3QrcbawwNcfD9qB",
                    "isConsume": null,
                    "jsonUrl": null,
                    "grade": 3,
                    "autoId": 90011000007635,
                    "rarityAttrValue": null,
                    "baseAttrValue": "Attack:10,AttackChaos:60,Strike:50",
                    "passiveAttrDesc": "Passive: Increase the basic skill action speed by 18%",
                    "specialAttrDesc": "[6CC0F6]Blade buff Brade get [8A2BE2]+53 Attack[-] with Storm Barcer equipped ",
                    "durabilityConfig": 5,
                    "durability": 5,
                    "name": "Pt:Storm Barcer"
                }
            ],
            "gasType": 1
        },
    ],
    "total": 4,
    "size": 10,
    "current": 1,
    "pages": 1 // 总页数
};

type tResEventList = typeof resEventList;

const dbEventItem = {
    "id": 1451,
    "type": 1,
    "name": "Pt:Storm Barcer",
    "autoId": null,
    "status": 3,
    "transferFrom": "",
    "transferTo": "",
    "createdBy": 363,
    "createdAt": 1692949221075,
    "updatedBy": 363,
    "updatedAt": 1692949221075,
    "eventEquipments": [
        {
            "imageUrl": "https://assets.seedslabs.io/ipfs/baofengbingyan.png",
            "isNft": 2,
            "itemType": 1,
            "mintAddress": "A1hka5SW7eqrrUz6d976AcQTgF9RA3QrcbawwNcfD9qB",
            "isConsume": null,
            "jsonUrl": null,
            "grade": 3,
            "autoId": 90011000007635,
            "rarityAttrValue": null,
            "baseAttrValue": "Attack:10,AttackChaos:60,Strike:50",
            "passiveAttrDesc": "Passive: Increase the basic skill action speed by 18%",
            "specialAttrDesc": "[6CC0F6]Blade buff Brade get [8A2BE2]+53 Attack[-] with Storm Barcer equipped ",
            "durabilityConfig": 5,
            "durability": 5,
            "name": "Pt:Storm Barcer"
        }
    ],
    "gasType": 1
};

type tDbEventItem = typeof dbEventItem;