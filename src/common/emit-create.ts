export const emitCreate = async (happening, mode, game) => {
  const url = mode.createApiUrl;

  const data = JSON.parse(happening.configuration);

  data.start = happening.start;
  data.end = happening.end;
  data.name = happening.name;
  data.description = happening.description;
  data.address = happening.address;

  // TEMP FOR ALR

  try {
    const results = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await results.json();
  } catch (error) {
    console.log(error);
  }
};
