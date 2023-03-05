export const emitCreate = async (happening, mode, game) => {
  const url = mode.createApiUrl;

  const data = JSON.parse(happening.configuration);

  data.start = happening.start;
  data.end = happening.end;
  data.name = happening.name;
  data.description = happening.description;
  data.nft_ticket_address = happening.address;

  // Fix for ALR
  data.title = data.name;

  console.log(url);

  console.log('CALL NOJI');
  console.log('DATA', data);

  try {
    const results = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tournament: data }),
    });

    const resultData = await results.json();

    console.log('RESULT', resultData);

    return resultData;
  } catch (error) {
    console.log(error);
  }
};
