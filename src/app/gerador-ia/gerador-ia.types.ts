export type PicLumenTranslatePayload = {
    prompt: string
    mode: "translation" | "enhance"
}

export type PicLumenTranslateResponse = {
    data: string
    message: string
    status: number
}

export type PicLumenModelosResponse = {
    status: number
    message: string
    data: PicLumenModelo[]
}

export type PicLumenModelo = {
    modelId: string
    modelDisplay: string
    modelType: string
    defaultHdFixDenoise: number
    modelAvatar: string
    modelDesc: string
    modelOrder: number
    defaultConfig: {
        width: number
        height: number
        seed: string
        steps: number
        cfg: number
        samplerName: string
        scheduler: string
        denoise: number
        positivePrompt: string
        negativePrompt: string
        hiresFixDenoise: number
        hiresScale: number
        modelAbility: any
    }
    supportStyleList: {
        label: string
        avatar: string
        value: string
        sort: number
        weight: number
    }[]
} | null;

export type PicLumenCreatePayload = {
    model_id: string
    prompt: string
    negative_prompt: string
    resolution: {
        width: number,
        height: number,
        batch_size: number
    }
    model_ability:  {
        anime_style_control: any
    }
    seed: number
    steps: number
    cfg: number
    sampler_name: string
    scheduler: string
    ponyTags: {}
    denoise: number
    hires_fix_denoise: number
    hires_scale: number
    gen_mode: string
    img2img_info: {
        weight: number
    }
}

export type PicLumenCreateResponse = {
    status: number
    message: string
    data: {
        markId: string
        fastHour: boolean
        index: number
    }
}

export type PicLumenProcessTaskPayload = FormData

export type PicLumenProcessTaskResponse = {
    status: number
    message: string
    data: {
        promptId: any
        markId: string
        status: string
        info: any
        index: number
        prompt: any
        img_urls: PicLumenImagem[]
    }
}

export type PicLumenImagem = {
    imgUrl: string
    thumbnailUrl: string
    highThumbnailUrl: string
    imgName: string
    sensitive: any
    realWidth: number
    realHeight: number
} | null