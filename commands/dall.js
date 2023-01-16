import { Configuration, OpenAIApi } from "openai";

export async function dall(interaction) {
    await interaction.deferReply();
    const tkn = process.env.aikey;
    const config = new Configuration({
        apiKey: tkn
    })
    const openai = new OpenAIApi(config);
    const imgSize = '256x256';
    const prompt = interaction.options.getString("text");
    
    if(!prompt || prompt == ''){
        await interaction.editReply("message can't be empty");
        return;
    }
    try {
        const rs = await openai.createImage({
            prompt,
            n: 1,
            size: imgSize
        })
        await interaction.editReply(rs.data.data[0].url);
    } catch (rr) {
        console.log(rr);
        await interaction.editReply(rr.message);
    }
}